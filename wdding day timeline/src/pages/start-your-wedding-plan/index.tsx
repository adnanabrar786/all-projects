import HTMLHeader from 'components/common/Head';
import dynamic from 'next/dynamic';

const NewOnboardingLayout = dynamic(() => import('components/common/NewOnbordingComponents/newOnboardingLayout'), {
  ssr: false,
});

const Page = () => {
  return (
    <>
      <HTMLHeader
        heading="Start Your Wedding Plan - Wedding Day Timeline"
        description="Begin planning your wedding effortlessly with Wedding Day Timeline."
      />

      <NewOnboardingLayout />
    </>
  );
};

export default Page;
