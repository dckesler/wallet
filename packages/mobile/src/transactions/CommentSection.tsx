import HorizontalLine from '@celo/react-components/components/HorizontalLine'
import colors from '@celo/react-components/styles/colors'
import fontStyles from '@celo/react-components/styles/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  comment?: string | null
}

export default function CommentSection({ comment }: Props) {
  const { t } = useTranslation()
  if (!comment) {
    return null
  }

  return (
    // Uses View instead of Fragment to workaround a glitch with LayoutAnimation
    <View>
      <HorizontalLine />
      <Text style={styles.sectionLabel}>{t('commentLabel')}</Text>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionLabel: {
    ...fontStyles.label,
    color: colors.gray3,
    marginBottom: 4,
  },
  comment: {
    ...fontStyles.regular,
  },
})
