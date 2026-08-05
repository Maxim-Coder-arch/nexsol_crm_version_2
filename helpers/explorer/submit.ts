export const handleSubmit = (e: React.FormEvent, selectedFile: File | null, isShared: boolean, onAdd: (file: File, isShared: boolean) => void) => {
    e.preventDefault();
    if (selectedFile) {
        onAdd(selectedFile, isShared);
    }
};