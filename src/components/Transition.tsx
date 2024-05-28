import { Slide } from '@mui/material';
import { ReactElement, forwardRef } from 'react';

export const Transition = forwardRef<HTMLDivElement, { children: ReactElement }>(function Transition<P>(
    props: P & { children: React.ReactElement },
    ref: React.Ref<HTMLDivElement>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});