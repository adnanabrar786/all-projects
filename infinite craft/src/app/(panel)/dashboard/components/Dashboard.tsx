"use client";

import PromptAccordion from "@/components/common/PromptAccordion";
import sampleData from "@/data/accordion.json";
import useAuth from "@/hooks/useAuth";
import { GeneratePrompt, PromptList } from "@/interface/prompt.interface";
import { generatePrompt, getProfile } from "@/services/prompt.service";
import { premiumUser } from "@/services/user.service";
import { RootState } from "@/store";
import { Colors } from "@/utils/enums/colors";
import { validateGeneratePromptInput } from "@/validator/prompt.validator";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../loading";
import AccordionSection from "./Accordion";
import AccordionFilter from "./AccordionFilter";
import TabButton from "./TabButton";
import { getTabsIcon } from "./tabIcon";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { setUserDetails } from "@/store/slices/authSlice";
import { useQuery } from "react-query";

const Dashboard = () => {
  useAuth();
  const router = useRouter();
  const [type, setType] = useState("");
  const options = sampleData.filter((item) => item.title === type);

  const _user = useSelector((state: RootState) => state.user);

  const premium: string = _user?.subscription;

  const token = _user.token;

  const premiumHandler = async () => {
    const { data } = await premiumUser(token);

    if (data) {
      router.push(data.url);
    }
  };
  const [input, setInput] = useState<Partial<GeneratePrompt>>({});

  const onChange = (key: string, value: string) => {
    setInput({ ...input, [key]: value });
  };
  const [promptlist, setPromptList] = useState<PromptList[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const error = useMemo(() => validateGeneratePromptInput(input), [input]);

  const { data, isLoading, isError, refetch } = useQuery(["user", token], () =>
    getProfile(token),
  );

  useEffect(() => {
    if (!isLoading && data && data?.data && _user) {
      dispatch(
        setUserDetails({
          ..._user,
          user_count: data?.data?.user_count,
        }),
      );
    }
  }, [data, isLoading]);

  const handleGeneratePrompt = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setLoading(true);
      try {
        if (input.message === "") {
          toast.error("Message is required");

          return;
        }
        const response = await generatePrompt(input, token);

        if (!Array.isArray(response.output)) {
          toast.error("failed to create prompt");
        }
        setPromptList(response.output);
        refetch();
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [token, input],
  );

  if (!premium) {
    return <Loading />;
  }

  return (
    <>
      <Box>
        <Grid container>
          <Grid
            xs={12}
            md={8}
            item
            sx={{
              height: { xs: "550px", sm: "30.25rem" },
              padding: "0.6rem",
            }}
          >
            <Box
              sx={{
                border: `0.06rem solid ${Colors.SPANISH_GRAY}`,
                borderRadius: "1.1rem",
                height: "100%",
                padding: "2.063rem 0.813rem",
                backgroundColor: "var(--backgroundwhite)",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  overflowX: "auto",
                  gap: "8px",
                  display: { xs: "flex", md: "none" },
                  "::-webkit-scrollbar": {
                    display: "none",
                    width: "0",
                    background: "transparent",
                  },
                }}
              >
                {sampleData.map(({ title }, i) => {
                  return (
                    <TabButton
                      key={i}
                      icon={getTabsIcon(title, type)}
                      text={title}
                      onClick={() => {
                        if (type === title) {
                          setType("");
                          return;
                        }
                        setType(title);
                      }}
                      variant={type === title ? "contained" : "text"}
                    />
                  );
                })}
              </Box>

              {type ? (
                <Box
                  sx={{
                    width: "100%",
                    marginTop: "20px",

                    height: { sm: "72.5%", xs: "62.5%" },
                  }}
                >
                  <AccordionFilter
                    options={options[0].options}
                    title={options[0].title}
                    onChange={onChange}
                    selectedData={input}
                  />
                </Box>
              ) : (
                <TextField
                  // value=input.message || ""
                  id="standard-multiline-static"
                  multiline
                  rows={12}
                  placeholder="Enter your Prompt here"
                  onChange={(e) => onChange("message", e.target.value)}
                  inputProps={{
                    style: { color: "var(--textWhite)" },
                  }}
                  sx={{
                    color: "var(--textwhite)",
                    width: "100%",
                    fontFamily: "Poppins !important",
                    fieldset: {
                      border: "none",
                      fontFamily: "Poppins !important",
                    },
                  }}
                />
              )}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: "0.5rem",
                    mt: { xs: "1.5rem", sm: "0rem" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={30} />
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        sx={{
                          padding: "0.9rem 1.3rem 0.9rem 1.3rem",
                          width: "7.5rem",
                          height: "2.938rem",
                          fontStyle: "Exo",
                        }}
                        disabled={loading}
                        onClick={handleGeneratePrompt}
                      >
                        Generate
                      </Button>
                      {premium && premium === "PREMIUM"
                        ? null
                        : premium && (
                            <Typography
                              sx={{
                                alignSelf: "auto",
                                textAlign: "center",
                                color: "var(--lightwhite)",
                                fontSize: { xs: "0.75rem", sm: "1rem" },
                              }}
                            >
                              {10 - _user?.user_count} / 10 Free prompts Used
                            </Typography>
                          )}
                    </>
                  )}
                </Box>

                {premium === "PREMIUM" ? null : (
                  <Button
                    sx={{
                      width: "7.5rem",
                      height: "2.938rem",
                      fontStyle: "Exo",
                      fontSize: "0.9rem",
                      backgroundColor: "var(--white)",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#FB7A1E",
                      border: "2px solid #FB7A1E",
                      borderRadius: "5px",
                      gap: "0.6525rem",
                    }}
                    onClick={premiumHandler}
                  >
                    Buy Premium
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              height: { xs: "auto", sm: "30.25rem" },
              padding: "0.6rem",
              overflowY: "auto",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            <AccordionSection selectedData={input} onChange={onChange} />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: "var(--lavender)",
                padding: "1.6rem 0.9rem",
                borderRadius: "0.8rem",
                mx: "0.7rem",
              }}
            >
              {!!promptlist.length && <PromptAccordion list={promptlist} />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
