import { FC } from "react";

interface DragAndDropFieldProps {
  label: string;
  file: File | null;
  onFileDrop: (file: File) => void;
  error?: string;
}

const DragAndDropField: FC<DragAndDropFieldProps> = ({
  label,
  file,
  onFileDrop,
  error,
}) => {
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "image/jpeg") {
      onFileDrop(droppedFile);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <div
        className="border rounded-sm p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? <p>{file.name}</p> : <p>Drag and drop a .jpg image here</p>}
      </div>
      {error && (
        <span className="text-red-500 transition-opacity duration-300">
          {error}
        </span>
      )}
    </div>
  );
};

export default DragAndDropField;
