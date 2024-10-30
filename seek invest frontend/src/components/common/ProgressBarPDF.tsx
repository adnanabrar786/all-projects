import { StyleSheet, View } from "@react-pdf/renderer";

const stylesProgress = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "red",
  },
});

interface Props {
  percentage: number | string;
  sx: any;
}

const ProgressBarPDF = ({ percentage, sx }: Props) => {
  return (
    <View style={[stylesProgress.progressBarContainer, { height: "8px" }]}>
      <View
        style={{
          ...stylesProgress.progressBar,
          width: `${percentage}%`,
          ...sx,
        }}
      />
    </View>
  );
};

export default ProgressBarPDF;
