import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomizedProgressBars from "components/common/Progress/Progress";
import TextXl from "components/common/Text/TextXl";
import TextXs from "components/common/Text/TextXs";
import { IValuesResult } from "interfaces/assessment";
import Image from "next/image";

interface Props {
  valuesResult: IValuesResult[];
}

const Values = ({ valuesResult }: Props) => {
  return (
    <Stack
      sx={{
        gap: "2.44rem",
      }}
    >
      <Stack>
        <TextXl
          text="Your Values Persona"
          sx={{
            marginTop: "2.63rem",
            fontSize: "3rem",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "3.75rem",
            letterSpacing: "-0.06rem",
            color: "var(--text-primary)",
          }}
        />
      </Stack>

      <Stack
        sx={{
          height: { sm: "auto", xs: "120vh" },
        }}
      >
        <TableContainer sx={{ overflow: "visible" }}>
          <Table
            sx={{ minWidth: { md: "925px", xs: "80%" } }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow
                sx={{
                  ".MuiTableCell-root": {
                    color: "var(--text-primary)",
                    borderWidth: "2px",
                    borderColor: "var(--text-primary)",
                    fontWeight: "700",
                    fontSize: "0.8125rem",
                    lineHeight: "1.25rem",
                    fontStyle: "normal",
                  },
                }}
              >
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Ranking
                </TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Preference</TableCell>
                <TableCell>Importance</TableCell>
              </TableRow>
            </TableHead>

            {valuesResult.map((result, index) => (
              <TableBody key={index}>
                <TableRow>
                  <TableCell>
                    <Stack>
                      <TextXs
                        sx={{
                          fontSize: "0.8125rem",
                          fontWeight: "400",
                          lineHeight: "1.25rem",
                          fontStyle: "normal",
                          color: "var(--text-primary)",
                          textAlign: "center",
                        }}
                        text={`${index + 1}`}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        gap: "0.25rem",
                      }}
                    >
                      <TextXs
                        sx={{
                          lineHeight: "1.25rem",
                          color: "var(--primary)",
                        }}
                        text={result.name}
                      />
                      <TextXs
                        sx={{
                          padding: "0.12rem 0.5rem",
                          color: "var(--text-secondary)",
                          lineHeight: "1.25rem",
                          fontWeight: "500",
                          fontSize: "0.75rem",
                          backgroundColor: result.bgColor,
                          borderRadius: "1rem",
                        }}
                        text={result.parent ? result.parent.name : ""}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction={"row"}
                      sx={{
                        gap: "0.44rem",
                        alignContent: "center",
                      }}
                    >
                      <Image
                        priority
                        src={result.icon}
                        alt={"icon"}
                        width={20}
                        height={20}
                      />

                      <TextXs
                        sx={{
                          lineHeight: "1.25rem",
                          color: "var(--text-primary)",
                        }}
                        text={`I will ${result.options}`}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {result.weight > 0 && (
                      <Stack
                        direction={"row"}
                        sx={{
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <TextXs
                          sx={{
                            lineHeight: "1.25rem",
                            color: "var(--text-primary)",
                          }}
                          text={`${result.weight}`}
                        />
                        <CustomizedProgressBars
                          value={result.weight}
                          sx={{
                            backgroundColor: "var(--black)",
                            width: "7.77844rem",
                          }}
                        />
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
};

export default Values;
