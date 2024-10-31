import {
  termsAgreement,
  termsContribution,
  termsIntellectual,
  termsList,
  termsNumberList,
  termsProhibited,
  termsPurchase,
  termsUserGenerate,
} from "@/constant/data";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Underline from "../Underline";
import Termsdesc from "./Termsdesc";
import TermsDescCard from "./Termsdesc/TermsDescCard";
import Termsheading from "./Termsheading";

const TermsCondition = () => {
  return (
    <>
      <Stack
        sx={{
          padding: {
            md: "60px 74px 60px 60px",
            sm: "40px 50px 40px 50px",
            xs: "40px 15px 50px 15px",
          },
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: { md: "flex-start", xs: "center" },
          }}
        >
          <Typography
            sx={{
              color: "var(--text-heading)",
              fontSize: { md: "40px", xs: "30px" },
              fontWeight: "700",
              lineHeight: "normal",
              textAlign: { md: "left", xs: "center" },
            }}
          >
            TERMS & CONDITIONS
          </Typography>
          <Underline sx={{ marginTop: "0px" }} />

          <Typography
            sx={{
              color: "var(--text-grey)",
              fontSize: { sm: "16px", xs: "14px" },
              fontWeight: "500",
              lineHeight: "200%",
              fontStyle: "normal",
            }}
          >
            Last updated January 01, 2020
          </Typography>
        </Stack>

        <Stack
          sx={{
            marginTop: "50px",
          }}
        >
          <Termsheading heading={`AGREEMENT TO TERMS`} termsNumber={1} />

          <TermsDescCard data={termsAgreement} />
        </Stack>

        <Stack
          sx={{
            marginTop: "40px",
          }}
        >
          <Termsheading
            heading={`INTELLECTUAL PROPERTY RIGHTS`}
            termsNumber={2}
          />

          <TermsDescCard data={termsIntellectual} />
        </Stack>

        <Stack
          sx={{
            marginTop: "40px",
          }}
        >
          <Termsheading heading={`USER REGISTRATION`} termsNumber={3} />

          <Stack
            direction={"column"}
            sx={{
              marginTop: "18.3px",
              display: "flex",
              gap: "25px",
            }}
          >
            <Termsdesc
              desc={`You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.`}
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            marginTop: "40px",
          }}
        >
          <Termsheading heading={`PRODUCTS`} termsNumber={4} />

          <Stack
            direction={"column"}
            sx={{
              marginTop: "18.3px",
              display: "flex",
              gap: "25px",
            }}
          >
            <Termsdesc
              desc={`We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability , and we cannot guarantee that items will be in stock . We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.`}
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            marginTop: "40px",
          }}
        >
          <Termsheading heading={`PURCHASES AND PAYMENT`} termsNumber={5} />

          <Stack
            direction={"column"}
            sx={{
              marginTop: "18.3px",
              display: "flex",
              gap: "25px",
            }}
          >
            <Termsdesc desc={`We accept the following forms of payment`} />
            <Stack
              direction={"column"}
              sx={{
                gap: "20px",
              }}
            >
              {termsList.map((part, index) => (
                <Stack key={index}>
                  <Typography
                    sx={{
                      color: "var(--text-heading)",
                      fontSize: { md: "18.496px", xs: "14px" },
                      fontWeight: "700",
                      lineHeight: "18.496px",
                      fontStyle: "normal",
                    }}
                  >
                    {part}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            {termsPurchase.map((terms, index) => (
              <Stack key={index}>
                <Termsdesc desc={terms} />
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Stack
          sx={{
            marginTop: "40px",
          }}
        >
          <Termsheading heading={`RETURN POLICY`} termsNumber={6} />

          <Stack
            direction={"column"}
            sx={{
              marginTop: "18.3px",
              display: "flex",
              gap: "25px",
            }}
          >
            <Termsdesc
              desc={`Please review our Return Policy posted on the Site prior to making any purchases.`}
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            marginTop: "40px",
          }}
        >
          <Termsheading heading={`PROHIBITED ACTIVITIES`} termsNumber={7} />

          <Stack
            direction={"column"}
            sx={{
              marginTop: "18.3px",
              display: "flex",
              gap: "25px",
            }}
          >
            {termsProhibited.map((terms, index) => (
              <Stack key={index}>
                <Termsdesc desc={terms} />
              </Stack>
            ))}
            <Stack>
              {termsNumberList.map((part, index) => (
                <Stack key={index}>
                  <Typography
                    sx={{
                      color: "var( --text-grey)",
                      fontSize: { md: "18.496px", xs: "14px" },
                      fontWeight: "400",
                      lineHeight: "200%",
                      fontStyle: "normal",
                    }}
                  >
                    {part}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{
            marginTop: "40px",
          }}
        >
          <Termsheading
            heading={`USER GENERATED CONTRIBUTIONS`}
            termsNumber={8}
          />

          <TermsDescCard data={termsUserGenerate} />
        </Stack>

        <Stack
          sx={{
            marginTop: "40px",
          }}
        >
          <Termsheading heading={`CONTRIBUTION LICENSE`} termsNumber={9} />

          <TermsDescCard data={termsContribution} />
        </Stack>
      </Stack>
    </>
  );
};

export default TermsCondition;
