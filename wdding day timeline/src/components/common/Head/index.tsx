import Head from 'next/head';
type Props = {
  heading?: string;
  description?: string;
};

const HTMLHeader = ({ heading, description }: Props) => {
  return (
    <Head>
      {description ? (
        <>
          <title>{heading}</title>
          <meta name="description" content={description} />
        </>
      ) : (
        <title>{heading + ' | WeddingDayTimeline'}</title>
      )}
    </Head>
  );
};

export default HTMLHeader;
