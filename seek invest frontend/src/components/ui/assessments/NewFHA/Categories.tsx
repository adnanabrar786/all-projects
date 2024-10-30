import { List } from "@mui/material";
import CustomListItem from "components/common/List/CustomListItem";
import { EAllAssessments } from "enums/enums";
import { INewAssessment } from "interfaces/assessment";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

const { ALL_ASSESSMENTS } = EAllAssessments;
interface Props {
  assessments: INewAssessment[];
}

const Categories = ({ assessments }: Props) => {
  const params = useParams();
  const searchParams = useSearchParams();

  const getHrefLink = (link: string) => {
    const urlSearchParams = new URLSearchParams(searchParams);

    return urlSearchParams.get("search")
      ? `${link}?${urlSearchParams.toString()}`
      : link;
  };

  return (
    <List sx={{ paddingTop: "0" }}>
      <Link href={getHrefLink(ALL_ASSESSMENTS)}>
        <CustomListItem
          item={"All Assessments"}
          activeItem={params.category === ALL_ASSESSMENTS}
        />
      </Link>

      {assessments.map((newFHACategory, index) => (
        <Link key={newFHACategory.name} href={getHrefLink(newFHACategory.id)}>
          <CustomListItem
            key={index}
            item={newFHACategory.name}
            activeItem={params.category === newFHACategory.id}
          />
        </Link>
      ))}
    </List>
  );
};

export default Categories;
