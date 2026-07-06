import clientPromise from "@/lib";
import { getTokenFromCookies, verifyToken } from "@/lib/auth";
import { RouteFactoryOptions } from "@/types/collections/route-factory-options.type";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const createRoute = (options: RouteFactoryOptions) => {
    const {
        collectionName,
        dbName = 'nexsol',
        transformCreate = (data: any) => data,
        transformUpdate = (data: any) => data,
        transformResponse = (data: any) => data,
        allowGetAll = true,
        allowCreate = true,
        allowUpdate = true,
        allowDelete = true,
        requireAuth = true,
        allowedRoles = [],
    } = options;

    const getCollection = async () => {
        const client = await clientPromise;
        const db = client.db(dbName);
        return db.collection(collectionName);
    }

    const checkAuth = async () => {
        if (!requireAuth) return { authorized: true, payload: null };

        const token = await getTokenFromCookies();
        if (!token) return { authorized: false, payload: null };

        const payload = verifyToken(token);
        if (!payload) return { authorized: false, payload: null };

        if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
            return { authorized: false, payload: null };
        }

        return { authorized: true, payload };
    };

    return {
        async GET(request: NextRequest) {
            console.log("drhgeherthrethrt")
            try {
                const collection = await getCollection();
                const data = await collection.find({}).sort({ createdAt: -1 }).toArray();
                const formatted = data.map((item: any) => ({
                    ...item,
                    _id: item._id.toString(),
                }));
                return NextResponse.json(formatted.map(transformResponse));
            } catch (error) {
                return NextResponse.json({ error: `Failed to fetch data, collection name = ${collectionName}`},  {status: 500 });
            }
        },

        async POST(request: NextRequest) {
            const auth = await checkAuth();
            try {
                const body = await request.json();
                const collection = await getCollection();
                const transformedData = await Promise.resolve(transformCreate(body));

                const newItem = {
                    ...transformedData,
                    createdBy: auth.payload?.userId,
                    createdByName: auth.payload?.name,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                const result = await collection.insertOne(newItem);

                const created = {
                    ...newItem,
                    _id: result.insertedId.toString(),
                };

                return NextResponse.json(transformResponse(created), { status: 201 });
            } catch (error) {
                return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
            }
        },

        async PATCH(request: NextRequest, { params }: {params: Promise<{id: string}>}) {
            try {
                const { id } = await params;
                const body = await request.json();
                const collection = await getCollection();
                const transformedData = await Promise.resolve(transformUpdate(body));
                
                const updateData = {
                    ...transformedData,
                    updatedAt: new Date(),
                };

                const result = await collection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updateData }
                );

                if (result.matchedCount === 0) {
                    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
                }

                const updated = await collection.findOne({ _id: new ObjectId(id) });

                return NextResponse.json(transformResponse({
                    ...updated,
                    _id: updated?._id.toString(),
                }));
            } catch (error) {
                console.error(`PATCH /${collectionName} error:`, error);
                return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
            }
        },

        async DELETE(request: NextRequest, { params }: {params: Promise<{id: string}>} ) {
            try {
                const { id } = await params;
                const collection = await getCollection();
                const result = await collection.deleteOne({ _id: new ObjectId(id) });

                if (result.deletedCount === 0) {
                    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
                }

                return NextResponse.json({ success: true });
            } catch (error) {
                return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
            }
        }
    }
}


export default createRoute;