import Button, { BtnSizes, BtnTypes } from '@celo/react-components/components/Button'
import colors from '@celo/react-components/styles/colors'
import fontStyles from '@celo/react-components/styles/fonts'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Mode } from 'src/backup/BackupQuiz'
import LoadingSpinner from 'src/icons/LoadingSpinner'

interface Props {
  onPressSubmit: () => void
  isQuizComplete: boolean
  mode: Mode
}

export function QuizzBottom({ onPressSubmit, isQuizComplete, mode }: Props) {
  const { t } = useTranslation()
  if (!isQuizComplete) {
    return null
  }
  switch (mode) {
    case Mode.Checking:
      return (
        <View style={styles.successCheck}>
          <LoadingSpinner width={24} />
        </View>
      )
    case Mode.Failed:
      return (
        <View>
          <Text style={styles.incorrect}>{t('backupQuizFailed')}</Text>
        </View>
      )
    default:
      return (
        <Button
          onPress={onPressSubmit}
          text={t('submit')}
          size={BtnSizes.FULL}
          type={BtnTypes.PRIMARY}
          testID={'QuizSubmit'}
        />
      )
  }
}

const styles = StyleSheet.create({
  successCheck: {
    alignItems: 'center',
    marginBottom: 24,
  },
  incorrect: {
    ...fontStyles.regular500,
    textAlign: 'center',
    color: colors.warning,
  },
})
