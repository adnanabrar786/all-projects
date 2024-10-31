import { companyDescribtion } from "@/constant/data";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";
import CompanyDesc from "./CompanyDesc";

const Company = () => {
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      sx={{
        padding: {
          md: "52px 26.33px 12px 100px",
          sm: "40px 36px 50px 30px",
          xs: "30px 15px 40px 15px",
        },
        backgroundColor: "var(--page-background)",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          width: { md: "270px", xs: "100%" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "var(--dark-blue)",
            fontFamily: "Krona One",
            fontSize: { sm: "40px", xs: "30px" },
            fontStyle: "normal",
            fontWeight: "400",
            width: "270px",
            textAlign: { md: "left", xs: "center" },
          }}
        >
          COMPANY PROFILE
        </Typography>
      </Stack>

      <Stack
        sx={{
          marginLeft: { md: "37px", xs: "0px" },
          marginTop: { md: "0px", xs: "40px" },
          display: "flex",
          gap: "30px",
        }}
      >
        {companyDescribtion.map((desc, index) => (
          <Stack key={index}>
            <CompanyDesc description={desc} />
          </Stack>
        ))}
      </Stack>

      <Stack
        sx={{
          display: { md: "block", xs: "none" },
          marginLeft: "24px",
          height: "762.487px",
          width: "171.67px",
          position: "relative",
        }}
      >
        <Image
          src={"/company.svg"}
          priority
          quality={100}
          width={171.67}
          height={762.487}
          alt="pic"
        />
      </Stack>
    </Stack>
  );
};

export default Company;
