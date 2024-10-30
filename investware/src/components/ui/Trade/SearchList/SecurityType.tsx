import { SECURITY_TYPE_VALUES } from '@/constants/securities';
import { ISecurityType } from '@/interfaces/securities';
import { getSecurityTypeComponent } from '@/utils/securities';
import Floater from './Floater';

interface Props {
  formik: any;
  securityTypeValueLabel: ISecurityType;
  securityTypeApiData: string;
}

const SecurityType = ({ formik, securityTypeValueLabel, securityTypeApiData }: Props) => {
  const isTypeFloater = getSecurityTypeComponent(securityTypeValueLabel.label) === SECURITY_TYPE_VALUES.Floater;
  const isSearchFloater = securityTypeApiData === SECURITY_TYPE_VALUES.Floater;

  return <>{(isTypeFloater || (isSearchFloater && formik.values.using_fixing_curve)) && <Floater formik={formik} />}</>;
};

export default SecurityType;
