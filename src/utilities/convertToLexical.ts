import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
  registerMarkdownShortcuts,
} from '@lexical/markdown'

import { createHeadlessEditor } from '@lexical/headless'
import { $generateNodesFromDOM } from '@lexical/html'
import {
  getEnabledNodes,
  sanitizeServerEditorConfig,
  SanitizedClientEditorConfig,
} from '@payloadcms/richtext-lexical'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import configPromise from '@payload-config'
import { Config } from 'payload'
import {
  lexicalEditor,
  LexicalEditorProps,
  LexicalRichTextAdapter,
} from '@payloadcms/richtext-lexical'
import { LexicalRichTextAdapterProvider } from 'node_modules/@payloadcms/richtext-lexical/dist/types'
import {
  defaultEditorConfig,
  defaultEditorFeatures,
  defaultEditorLexicalConfig,
} from '@payloadcms/richtext-lexical' // <= make sure this package is installed
import { editorStateHasDirtySelection } from 'node_modules/lexical/LexicalEditorState'
import {
  EditorConfigProvider,
  sanitizeClientEditorConfig,
  sanitizeClientFeatures,
} from '@payloadcms/richtext-lexical/client'

import { ResolvedServerFeature } from '@payloadcms/richtext-lexical'

import { ResolvedClientFeatureMap } from '@payloadcms/richtext-lexical'

import { getPayloadHMR } from '@payloadcms/next/utilities'

type Props = {
  markdownString: string
}

export const getLexicalFromMarkDown = async ({ markdownString }: Props) => {
  const payloadConfig = await configPromise
  const yourEditorConfig = { ...defaultEditorConfig }

  yourEditorConfig.features = [
    ...defaultEditorFeatures,
    // Add your custom features here
  ]

  const editorConfig = await sanitizeServerEditorConfig(yourEditorConfig, payloadConfig)
  const transformers = editorConfig?.features?.markdownTransformers
  //   const transformers = TRANSFORMERS

  const editor = createHeadlessEditor({
    nodes: getEnabledNodes({ editorConfig }),
  })

  registerMarkdownShortcuts(editor, transformers)

  editor.update(
    () => {
      // Convert Markdown to editor state
      console.log('markdownString', markdownString)
      $convertFromMarkdownString(markdownString, transformers)
    },
    { discrete: true },
  )

  const editorState = editor.getEditorState()
  console.log('Editor State:', editorState.toJSON())

  return editorState
}

export const createPalylodEditor = (): LexicalRichTextAdapterProvider => {
  //   const payloadConfig = await configPromise
  //   const yourEditorConfig = { ...defaultEditorLexicalConfig }

  //   yourEditorConfig.features = [
  //     ...defaultEditorFeatures,
  //     // Add your custom features here
  //   ]

  //   const editorConfig = sanitizeClientEditorConfig(
  //     sanitizeClientFeatures,
  //     sanitizeClientEditorConfig,
  //   )
  //   const transformers = editorConfig?.features?.markdownTransformers
  //   const transformers = TRANSFORMERS

  //   const editor = createHeadlessEditor({
  //     nodes: getEnabledNodes({ editorConfig }),
  //   })

  //   registerMarkdownShortcuts(editor, transformers)

  return lexicalEditor()
}