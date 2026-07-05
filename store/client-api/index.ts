import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiClient = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Bids", "Clients", "Reviews", "Users", "Funnels", "Files", "Services"],
    endpoints: (builder) => ({
        getBids: builder.query({
            query: () => "/bids",
            providesTags: ["Bids"]
        }),
        createBid: builder.mutation({
            query: (body) => ({
                url: "/bids",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Bids"],
        }),
        updateBid: builder.mutation({
            query: ({ id, data }) => ({
                url: `/bids/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Bids'],
        }),
        deleteBid: builder.mutation({
            query: (id) => ({
                url: `/bids/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bids'],
        }),

        getClients: builder.query({
            query: () => '/clients',
            providesTags: ['Clients'],
        }),
        createClient: builder.mutation({
            query: (body) => ({
                url: '/clients',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Clients'],
        }),
        updateClient: builder.mutation({
            query: ({ id, data }) => ({
                url: `/clients/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Clients'],
        }),
        deleteClient: builder.mutation({
            query: (id) => ({
                url: `/clients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Clients'],
        }),

        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['Users'],
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),

        getReviews: builder.query({
            query: () => '/reviews',
            providesTags: ['Reviews'],
        }),
        createReview: builder.mutation({
            query: (body) => ({
                url: '/reviews',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Reviews'],
        }),
        updateReview: builder.mutation({
            query: ({ id, data }) => ({
                url: `/reviews/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Reviews'],
        }),
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reviews'],
        }),

        getFunnels: builder.query({
            query: () => '/funnels',
            providesTags: ['Funnels'],
        }),
        createFunnel: builder.mutation({
            query: (body) => ({
                url: '/funnels',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Funnels'],
        }),
        updateFunnel: builder.mutation({
            query: ({ id, data }) => ({
                url: `/funnels/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Funnels'],
        }),
        deleteFunnel: builder.mutation({
            query: (id) => ({
                url: `/funnels/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Funnels'],
        }),

        getFiles: builder.query({
            query: () => '/files',
            providesTags: ['Files'],
        }),
        uploadFile: builder.mutation({
            query: (formData) => ({
                url: '/files/upload',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: ['Files'],
        }),
        deleteFile: builder.mutation({
            query: (id) => ({
                url: `/files/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Files'],
        }),

        getServices: builder.query({
            query: () => "/services",
            providesTags: ["Services"]
        }),
        createService: builder.mutation({
            query: (body) => ({
                url: "/services",
                method: "POST",
                body
            }),
            invalidatesTags: ["Services"]
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/services/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Services"]
        })
    }),
});


export const {
    // Bids
    useGetBidsQuery,
    useCreateBidMutation,
    useUpdateBidMutation,
    useDeleteBidMutation,
    // Clients
    useGetClientsQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
    // Users
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    // Reviews
    useGetReviewsQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    // Services
    useCreateServiceMutation,
    useGetServicesQuery,
    useDeleteServiceMutation,
    // Funnels
    useGetFunnelsQuery,
    useCreateFunnelMutation,
    useUpdateFunnelMutation,
    useDeleteFunnelMutation,
    // Files
    useGetFilesQuery,
    useUploadFileMutation,
    useDeleteFileMutation,
} = apiClient;