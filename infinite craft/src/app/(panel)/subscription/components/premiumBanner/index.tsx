// import { exo, poppins } from '@/components/ThemeRegistry/theme';
// import { Colors } from '@/utils/enums/colors';
// import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
// import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// export default function PremiumBanner() {
//   return (
//     <>
//       <Grid
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           position: 'relative',
//         }}
//         item
//         md={6}
//         xs={12}
//       >
//         <Stack
//           sx={{
//             padding: '1.5rem',
//             display: 'flex',
//             backgroundColor: '#2D969B',

//             borderRadius: '0.5rem',
//             height: '12.5rem',
//             // width: '35rem',
//             width: '100%',
//             // paddingY: '1.7rem',

//             flexDirection: 'column',
//             alignItems: 'start',
//             textAlign: 'center',
//             border: `0.13rem solid ${Colors.ZOMP}`,
//           }}
//         >
//           <Typography
//             sx={{
//               fontFamily: exo.style.fontFamily,
//               color: '#fff',
//               fontSize: '1.5rem',
//               textAlign: 'left',
//               fontStyle: 'normal',
//               fontWeight: '800',
//               textTransform: 'capitalize',
//             }}
//           >
//             Premium
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: poppins.style.fontFamily,
//               fontSize: '1rem',
//               fontWeight: '400',
//               color: '#fff',
//               alignItems: 'center',
//             }}
//           >
//             $10/ Month
//           </Typography>

//           <Box
//             sx={{
//               display: 'flex',
//               //   gap: '2rem',
//               alignItems: 'auto',
//             }}
//           >
//             <Box>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   gap: '0.5rem',
//                   // alignItems: 'left',
//                   paddingY: '1rem',
//                 }}
//               >
//                 <DoneOutlinedIcon
//                   sx={{
//                     color: '#fff',
//                   }}
//                 />
//                 <Typography
//                   sx={{
//                     color: '#fff',
//                     textAlign: 'center',
//                     fontFamily: poppins.style.fontFamily,

//                     fontSize: '1rem',
//                     fontWeight: '400',
//                     fontStyle: 'normal',
//                   }}
//                 >
//                   Unlimited Prompts
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   display: 'flex',
//                   gap: '0.75rem',
//                   // alignItems: 'left',
//                   paddingY: '0.5rem',
//                   marginBottom: '1rem',
//                 }}
//               >
//                 <DoneOutlinedIcon
//                   sx={{
//                     color: '#fff',
//                   }}
//                 />
//                 <Typography
//                   sx={{
//                     color: '#fff',
//                     textAlign: 'center',
//                     fontSize: '1rem',
//                     fontWeight: '400',
//                     fontStyle: 'normal',
//                   }}
//                 >
//                   Upto 3 suggestion Prompts
//                 </Typography>
//               </Box>
//             </Box>
//             <Button
//               sx={{
//                 backgroundColor: '#fff',
//                 height: '4.5rem',
//                 width: '9.9375rem',
//                 marginTop: '1rem',
//                 marginLeft: '5.8rem',
//               }}
//             >
//               <Typography
//                 sx={{
//                   color: '#2D969B',
//                 }}
//               >
//                 Try Premium
//               </Typography>
//             </Button>
//           </Box>
//         </Stack>
//       </Grid>
//     </>
//   );
// }
