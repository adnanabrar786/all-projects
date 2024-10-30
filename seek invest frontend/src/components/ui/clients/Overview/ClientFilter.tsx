import { ClickAwayListener, Stack, Typography } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import ListButton from "components/common/Button/ListButton";
import MenuCard from "components/common/Card/MenuCard";
import FilterInnerTopics from "components/ui/clients/Overview/FilterInnerTopics";
import FilterOuterTopics from "components/ui/clients/Overview/FilterOuterTopics";
import SearchClient from "components/ui/clients/Overview/SearchClient";
import SearchHousehold from "components/ui/clients/Overview/SearchHousehold";
import {
  CrossGrey500Icon,
  FilterIcon,
  SortIcon,
} from "constants/images.routes";
import { useClientFilter } from "hooks/useClientFilter";
import { IClientFilter } from "interfaces/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { truncateStringIfNeeded } from "utils/string";

const sortByOptions = [
  {
    title: "Account Value: High to Low",
    value: "desc",
    key: "amount_sort",
  },
  {
    title: "Account Value: Low to High",
    value: "asc",
    key: "amount_sort",
  },
  {
    title: "Client name: A - Z",
    value: "asc",
    key: "client_name",
  },
  {
    title: "Client name: Z - A",
    value: "desc",
    key: "client_name",
  },
];

interface Props {
  openFilter: boolean;
  setOpenFilter: (openFilter: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  activeSliderButton: string;
  setFilters: (value: string) => void;
  setPageNo: (value: number) => void;
  setHouseholdPage: (value: number) => void;
  setSortBy?: (value: string) => void;
  setSortByKey?: (value: string) => void;
}

const ClientFilter = ({
  openFilter,
  setOpenFilter,
  setSearchValue,
  searchValue,
  activeSliderButton,
  setFilters,
  setPageNo,
  setHouseholdPage,
  setSortBy,
  setSortByKey,
}: Props) => {
  const [filterToggle, setFilterToggle] = useState<boolean>(true);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState({});
  const [clientsTopicList, setClientsTopicList] = useState<any[]>([]);

  const [openSort, setOpenSort] = useState(false);
  const [searchClientValueTopic, setSearchClientValueTopic] =
    useState<string>("");

  const { clientFilterData } = useClientFilter();

  const handleInnerTopicClick = (topic: Record<string, string>) => {
    let tempSelectedTopics = { ...selectedTopics };
    const valueIndex = tempSelectedTopics[selectedTopic]?.indexOf(topic);

    if (valueIndex === -1) {
      tempSelectedTopics[selectedTopic].push(topic);
    } else {
      tempSelectedTopics[selectedTopic].splice(valueIndex, 1);
    }
    setSelectedTopics(tempSelectedTopics);
  };

  const handleOuterTopicClick = (topic: IClientFilter) => {
    if (!selectedTopics[topic.name]) {
      setSelectedTopics({ [topic.name]: [] });
    }
    setClientsTopicList(topic.list);
    setSelectedTopic(topic.name);
    setFilterToggle(!filterToggle);
  };

  const handleSelectedTopicFilter = () => {
    setOpenFilter(false);
    setSelectedTopics({});
    setFilters("");
    setSelectedTopic("");
  };

  const topicsString = Object.values(selectedTopics)
    .flat()
    .map((topic: any) => topic.name)
    .join(", ");

  useEffect(() => {
    const selectedFilterKey = clientFilterData?.find((filter) => {
      return filter.name === selectedTopic;
    });

    if (selectedFilterKey) {
      const selectedFilters = Object.values(selectedTopics)
        .flat()
        .map((topic: any) => {
          return topic.name;
        });

      if (selectedFilters.length > 0) {
        setFilters(
          encodeURIComponent(
            JSON.stringify({
              [selectedFilterKey?.key]: selectedFilters,
            })
          )
        );
      } else {
        setFilters("");
      }
    }
  }, [selectedTopics]);

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent:
          activeSliderButton === "Clients" ? "space-between" : "flex-end",
        mb: "2rem",
      }}
    >
      {activeSliderButton === "Clients" && (
        <Stack direction={"row"} sx={{ gap: "0.6rem" }}>
          <ClickAwayListener onClickAway={() => setOpenSort(false)}>
            <Stack
              sx={{
                position: "relative",
                zIndex: "100",
              }}
            >
              <FilledButton
                onClick={() => {
                  setOpenSort(!openSort);
                }}
                sx={{
                  cursor: "pointer",
                }}
                secondary
                startIcon={
                  <Image
                    className="searchIcon"
                    priority
                    src={SortIcon}
                    alt={"icon"}
                    width={20}
                    height={20}
                  />
                }
                text="Sort"
              />

              {openSort && (
                <MenuCard
                  sx={{
                    position: "absolute",
                    left: "0",
                    minWidth: "15rem",
                    top: "3rem",
                  }}
                >
                  {sortByOptions.map((sortByOption, index) => (
                    <ListButton
                      key={index}
                      text={sortByOption.title}
                      onClick={() => {
                        if (setSortBy && setSortByKey) {
                          setSortBy(sortByOption.value);
                          setSortByKey(sortByOption.key);
                        }

                        setOpenSort(false);
                      }}
                    />
                  ))}
                </MenuCard>
              )}
            </Stack>
          </ClickAwayListener>

          <ClickAwayListener
            onClickAway={() => {
              setOpenFilter(false);
              setFilterToggle(false);
            }}
          >
            <Stack
              sx={{
                position: "relative",
                zIndex: "100",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  gap: "1rem",
                }}
              >
                <FilledButton
                  onClick={() => {
                    setFilterToggle(true);
                    setOpenFilter(!openFilter);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                  secondary
                  startIcon={
                    <Image
                      className="searchIcon"
                      priority
                      src={FilterIcon}
                      alt={"icon"}
                      width={20}
                      height={20}
                    />
                  }
                  text="Filter"
                />
                {!!selectedTopics[selectedTopic]?.length && (
                  <Stack
                    direction={"row"}
                    sx={{
                      borderRadius: "1rem",
                      backgroundColor: "var(--gray-100)",
                      padding: "0.25rem 0.75rem",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      img: {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8125rem",
                        fontWeight: "500",
                        fontStyle: "normal",
                        color: "var(--text-primary)",
                        lineHeight: "1.25rem",
                        span: {
                          color: "var(--primary)",
                        },
                      }}
                    >
                      {Object.keys(selectedTopics)}:
                      <span> {truncateStringIfNeeded(topicsString, 15)}</span>
                    </Typography>
                    <Image
                      onClick={handleSelectedTopicFilter}
                      priority
                      src={CrossGrey500Icon}
                      alt={"icon"}
                      width={16}
                      height={16}
                    />
                  </Stack>
                )}
              </Stack>

              {openFilter && (
                <MenuCard
                  sx={{
                    position: "absolute",
                    left: "0",
                    width: "300px",
                    top: "3rem",
                  }}
                >
                  {filterToggle ? (
                    <FilterOuterTopics
                      clientFilterData={clientFilterData ?? []}
                      onClickTopic={(topic: IClientFilter) => {
                        handleOuterTopicClick(topic);
                      }}
                    />
                  ) : (
                    <FilterInnerTopics
                      clientsTopicList={clientsTopicList}
                      handleInnerTopicClick={handleInnerTopicClick}
                      searchClientValueTopic={searchClientValueTopic}
                      selectedTopic={selectedTopic}
                      selectedTopics={selectedTopics}
                      setSearchClientValueTopic={setSearchClientValueTopic}
                    />
                  )}
                </MenuCard>
              )}
            </Stack>
          </ClickAwayListener>
        </Stack>
      )}

      {activeSliderButton === "Clients" ? (
        <SearchClient
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          setPageNo={setPageNo}
        />
      ) : (
        <SearchHousehold
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          setHouseholdPage={setHouseholdPage}
        />
      )}
    </Stack>
  );
};

export default ClientFilter;
