import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'

import { NavItem } from './Navbar'

interface DesktopSubNavProps extends NavItem {
  isSelected?: boolean
}

function SubNavItem({ label, onClick, subLabel, isSelected }: DesktopSubNavProps) {
  const hoverBg = useColorModeValue('pink.50', 'gray.900')
  const hoverColor = 'pink.400'

  return (
    <Link
      onClick={onClick}
      role="group"
      display="block"
      p={2}
      rounded="md"
      bg={isSelected ? hoverBg : 'transparent'}
      _hover={{ bg: hoverBg }}
      w="100%"
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            color={isSelected ? hoverColor : 'inherit'}
            _groupHover={{ color: hoverColor }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize="sm">{subLabel}</Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform={isSelected ? 'translateX(0)' : 'translateX(-10px)'}
          opacity={isSelected ? 1 : 0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

export default SubNavItem
