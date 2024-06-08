import { Paper, Typography } from '@mui/material'
import EntityDrawerListItem from './EntityDrawerListItem'
import { OptionsType } from '@/types/FormTypes'
import { useTranslation } from 'react-i18next'

interface EntityDrawerDetailListProps {
    items: OptionsType[]
    action(id: string): void
    title: string
}

const EntityDrawerDetailList = ({ items, action, title }: EntityDrawerDetailListProps) => {
    const { t } = useTranslation('common')
    const handleAction = (id: string) => {
        action(id)
    }

    return (
        <>
            <Typography variant='h5'>{title}</Typography>
            <Paper sx={{ width: '100%', flex: 1 }}>
                {items.map((item) => <EntityDrawerListItem key={item.id} label={item.label} action={handleAction} id={item.id} tooltipTitle={t('viewDetails')} />)}
            </Paper>
        </>
    )
}

export default EntityDrawerDetailList