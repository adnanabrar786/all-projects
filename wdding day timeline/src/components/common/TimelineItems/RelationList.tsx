import React from 'react';

type RelationListProps = {
  relation: string[];
};

const RelationList: React.FC<RelationListProps> = ({ relation }) => {
  return (
    <div className="flex">
      {relation.map((item: string, index) => (
        <p key={`${index}`} className="whitespace-nowrap pl-1 font-medium text-w_xs1 xl:text-sm  text-purple">
          {item + (index === relation.length - 1 ? '' : ',')}
        </p>
      ))}
    </div>
  );
};

export default RelationList;
