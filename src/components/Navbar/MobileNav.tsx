import { Stack, useColorModeValue } from '@chakra-ui/react';
import { NavItem } from './Navbar';
import MobileNavItem from './MobileNavItem';

interface Props {
  items: NavItem[];
}

function MobileNav({ items }: Props) {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {items.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
}

export default MobileNav