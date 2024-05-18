import OrganizationPickerDialog from '@/components/OrganizationPickerDialog';
import { OrganizationType } from '@/types/OrganizationType';
import { Dispatch, SetStateAction, createContext } from 'react';
import { PropsWithChildren, useState } from 'react'

const initialOrg: OrganizationType = {
    id: 'fake',
    orgName: 'fake',
    orgSlug: 'fake'
}

interface OrgDataContextProps {
    orgId: string
    setOrgId: Dispatch<SetStateAction<string>>
    orgStopNames: string[]
    setOrgStopNames: Dispatch<SetStateAction<string[]>>
    organizationArray: OrganizationType[]
    setOrganizationArray: Dispatch<SetStateAction<OrganizationType[]>>
    organizationOverride: boolean
    setOrganizationOverride: Dispatch<SetStateAction<boolean>>
    organizationLoginImageUrl: string
    setOrganizationLoginImageUrl: Dispatch<SetStateAction<string>>
    toggleShowOrganizationSelector: () => void
}

export const OrgDataContext = createContext<OrgDataContextProps>({
    orgId: '',
    setOrgId: () => {},
    orgStopNames: [''],
    setOrgStopNames: () => {},
    organizationArray: [initialOrg],
    setOrganizationArray: () => {},
    organizationOverride: false,
    setOrganizationOverride: () => {},
    organizationLoginImageUrl: '',
    setOrganizationLoginImageUrl: () => {},
    toggleShowOrganizationSelector: () => {}
});

export const OrgDataContextProvider = ({ children }: PropsWithChildren) => {
    const [orgId, setOrgId] = useState<string>('')
    const [orgStopNames, setOrgStopNames] = useState<string[]>([])
    const [organizationOverride, setOrganizationOverride] = useState(false)
    const [showOrganizationSelector, setShowOrganizationSelector] = useState(false)
    const [organizationArray, setOrganizationArray] = useState<OrganizationType[]>([])
    const [organizationLoginImageUrl, setOrganizationLoginImageUrl] = useState('')

    const toggleShowOrganizationSelector = () => {
        setShowOrganizationSelector((cur) => !cur)
    }

    const handleSelectOrganization = (orgId: string) => {
        setOrgId(orgId)
        setOrganizationOverride(true)
        toggleShowOrganizationSelector()
    }

    return (
        <OrgDataContext.Provider value={{
            orgId, setOrgId,
            orgStopNames, setOrgStopNames,
            organizationOverride, setOrganizationOverride,
            organizationLoginImageUrl, setOrganizationLoginImageUrl,
            organizationArray, setOrganizationArray,
            toggleShowOrganizationSelector
        }}>
            <OrganizationPickerDialog open={showOrganizationSelector} handleSelectOrganization={handleSelectOrganization} organizations={organizationArray} />
            {children}
        </OrgDataContext.Provider>
    );
};
