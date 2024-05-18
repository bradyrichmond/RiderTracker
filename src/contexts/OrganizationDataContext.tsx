import OrganizationPickerDialog from "@/components/OrganizationPickerDialog";
import { OrganizationType } from "@/types/OrganizationType";
import { createContext } from "react";
import { PropsWithChildren, useState } from "react"

const initialOrg: OrganizationType = {
    id: 'fake',
    orgName: 'fake',
    orgSlug: 'fake'
}

export const OrgDataContext = createContext({
    // @ts-ignore
    orgId: '',
    setOrgId: (_neworgId: string) => {},
    orgStopNames: [""],
    setOrgStopNames: (_newStopNames: string[]) => {},
    organizationArray: [initialOrg],
    setOrganizationArray: (_newStopNames: OrganizationType[]) => {},
    organizationOverride: false,
    setOrganizationOverride: (_bool: boolean) => {},
    organizationLoginImageUrl: '',
    setOrganizationLoginImageUrl: (_url: string) => {},
    toggleShowOrganizationSelector: () => {}
});

export const OrgDataContextProvider = ({ children }: PropsWithChildren<{}>) => {
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
            <OrganizationPickerDialog open={showOrganizationSelector} handleSelectOrganization={handleSelectOrganization} organizations={organizationArray}/>
            {children}
        </OrgDataContext.Provider>
    );
};
