import IconText from '@/components/common/Icontext/IconText';
import { profileList } from '@/constants/constant';
import { Stack } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  showMenubar?: boolean;
  setShowMenubar?: (showMenubar: boolean) => void;
}

const ContentItems = ({ showMenubar, setShowMenubar }: Props) => {
  const activeIndex = usePathname();
  return (
    <Stack
      sx={{
        gap: '1.37rem',
      }}
    >
      {profileList.map((list, index) => (
        <Stack
          key={index}
          onClick={() => {
            if (setShowMenubar) {
              setShowMenubar(!showMenubar);
            }
          }}
        >
          <Link href={list.link}>
            <IconText
              text={list.text}
              icon={list.icon}
              iconWidth={20}
              iconHeight={20}
              sxRow={{
                cursor: 'pointer',
              }}
              sxText={{
                color: activeIndex === list.link ? 'var(--sky-blue)' : 'var(--text-grey-200)',
              }}
            />
          </Link>
        </Stack>
      ))}
    </Stack>
  );
};

export default ContentItems;
