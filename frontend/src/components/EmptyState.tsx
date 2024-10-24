import React, { FC } from "react";

interface EmptyStateProps {
  entity: string;
}

const EmptyState: FC<EmptyStateProps> = ({ entity }) => {
  return (
    <div className="flex w-full flex-col bg-gray-200 shadow-lg border-2 border-gray-300 rounded-lg h-16 items-center justify-center">
      <div>{`No ${entity} found.`}</div>
      <div>{`Start adding new ${entity} to see them listed here.`}</div>
    </div>
  );
};

export default EmptyState;
