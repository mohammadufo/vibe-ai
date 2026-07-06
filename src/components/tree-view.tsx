import { TreeItem } from '@/types'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar'
import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react'

interface TreeViewProps {
  data: TreeItem[]
  value?: string | null
  onSelect?: (value: string) => void
}

export const TreeView = ({ data, value, onSelect }: TreeViewProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => (
                  <Tree
                    key={index}
                    item={item}
                    selectedValue={value}
                    onSelect={onSelect}
                    parentPath=""
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}

interface TreeProps {
  item: TreeItem
  selectedValue?: string | null
  onSelect?: (value: string) => void
  parentPath: string
}

const Tree = ({ item, selectedValue, onSelect, parentPath }: TreeProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item]
  const currentPath = parentPath ? `${parentPath}/${name}` : name

  if (!items.length) {
    const isSelected = selectedValue === currentPath

    return (
      <SidebarMenuButton
        isActive={isSelected}
        className="transition-colors data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium"
        onClick={() => onSelect?.(currentPath)}
      >
        <FileIcon className="text-muted-foreground" />
        <span className="truncate">{name}</span>
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="transition-colors">
            <ChevronRightIcon className="transition-transform text-muted-foreground" />
            <FolderIcon className="text-primary/70 fill-primary/10" />
            <span className="truncate font-medium">{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree
                key={index}
                item={subItem}
                selectedValue={selectedValue}
                onSelect={onSelect}
                parentPath={currentPath}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
