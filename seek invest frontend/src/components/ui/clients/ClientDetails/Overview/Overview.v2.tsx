import Bio from "components/ui/clients/ClientDetails/Overview/Bio";
import FinancialGoals from "components/ui/clients/ClientDetails/Overview/FinancialGoals";
import TotalAccountValue from "components/ui/clients/ClientDetails/Overview/TotalAccountValue";

const Overview = () => {
  return (
    <>
      <TotalAccountValue />
      <Bio />
      <FinancialGoals />
    </>
  );
};

export default Overview;
