import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

import styles from '../styles/Error.module.css'

interface Props {
  message: string
}

export default function Error({ message }: Props) {
  return (
    <Box className={styles.box}>
      <Box className={styles.inlineBlock}>
        <Flex className={styles.flexContainer} bg="red.500">
          <CloseIcon className={styles.icon} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" className={styles.heading}>
        Something went wrong
      </Heading>
      <Text color="gray.500">{message}</Text>
    </Box>
  )
}
