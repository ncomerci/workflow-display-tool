import { Box, Link, Popover, PopoverContent, PopoverTrigger, Stack, useColorModeValue } from '@chakra-ui/react'

import styles from '../../styles/DesktopNav.module.css'

import { NavItem } from './Navbar'
import SubNavItem from './SubNavItem'

interface Props {
  items: NavItem[]
}

function DesktopNav({ items }: Props) {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction="row" spacing={4}>
      {items.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                className={styles.link}
                fontSize="sm"
                onClick={navItem.onClick}
                color={linkColor}
                _hover={{
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} p={4} bg={popoverContentBgColor} boxShadow="xl" rounded="xl" minW="sm">
                <Stack>
                  {navItem.children.map((child) => (
                    <SubNavItem key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

export default DesktopNav
