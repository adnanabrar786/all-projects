import NextLink from 'next/link';
import { ForwardedRef, forwardRef, memo } from 'react';

type Props = {
  id?: string;
  href: string;
  text?: string;
  as?: string;
  passHref?: boolean;
  shallow?: boolean;
  replace?: boolean;
  className?: string;
  children?: JSX.Element;
  target?: string;
};

function LinkComponent(
  { id = '', href, text, as, shallow, children, replace, className = '', passHref, target }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <span className={className}>
      <NextLink
        id={id}
        as={as}
        ref={ref}
        target={target}
        href={href}
        prefetch={false}
        shallow={shallow}
        replace={replace}
        passHref={passHref}
        className={className}
      >
        {children ?? text}
      </NextLink>
    </span>
  );
}

export default memo(forwardRef(LinkComponent));
