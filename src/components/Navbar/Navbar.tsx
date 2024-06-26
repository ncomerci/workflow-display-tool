import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Collapse, Flex, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react'

import Logo from '../../assets/logo.png'
import styles from '../../styles/Navbar.module.css'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  onClick?: () => void
  isSelected?: boolean
}

interface Props {
  workflowItems: Pick<NavItem, 'label' | 'onClick' | 'isSelected'>[]
  enviromentItems: Pick<NavItem, 'label' | 'onClick' | 'isSelected'>[]
}

export default function Navbar({ workflowItems, enviromentItems }: Props) {
  const { isOpen, onToggle } = useDisclosure()

  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Environments',
      children: enviromentItems,
    },
    {
      label: 'Workflows',
      children: workflowItems,
    },
  ]

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'end', md: 'start' }} align="center">
          <Flex justify={{ base: 'center', md: 'start' }}>
            <img className={styles.logo} src={Logo} alt="Logo" />
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav items={NAV_ITEMS} />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav items={NAV_ITEMS} />
      </Collapse>
    </Box>
  )
}
