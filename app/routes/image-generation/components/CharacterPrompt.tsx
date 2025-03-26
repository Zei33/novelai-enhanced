import { Box, Card, Flex, Text, TextArea, IconButton } from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';
import * as RadixIcons from '@radix-ui/react-icons';
import { Character } from './CharactersArea';

interface CharacterPromptProps {
	character: Character;
	onChange: (changes: Partial<Character>) => void;
	onRemove: () => void;
}

export default function CharacterPrompt({ character, onChange, onRemove }: CharacterPromptProps) {
	return (
		<Card>
			<Flex direction="column" gap="2">
				<Flex justify="between" align="center">
					<Flex align="center" gap="2">
						<Box style={{ 
							width: '12px', 
							height: '12px', 
							borderRadius: '50%',
							backgroundColor: character.type === 'Female' ? 'var(--violet-9)' : 
								character.type === 'Male' ? 'var(--blue-9)' : 'var(--green-9)'
						}} />
						<Text weight="bold">{character.type} Character</Text>
					</Flex>
					<IconButton variant="ghost" onClick={onRemove}>
						<RadixIcons.Cross2Icon />
					</IconButton>
				</Flex>

				<Tabs.Root defaultValue="positive">
					<Tabs.List className="flex border-b mb-2">
						<Tabs.Trigger 
							value="positive" 
							className="px-3 py-1 text-sm hover:bg-zinc-800 dark:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-violet-500"
						>
							Positive
						</Tabs.Trigger>
						<Tabs.Trigger 
							value="negative" 
							className="px-3 py-1 text-sm hover:bg-zinc-800 dark:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-violet-500"
						>
							Negative
						</Tabs.Trigger>
						<Tabs.Trigger 
							value="positioning" 
							className="px-3 py-1 text-sm hover:bg-zinc-800 dark:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-violet-500"
						>
							Positioning
						</Tabs.Trigger>
					</Tabs.List>
					
					<Tabs.Content value="positive" className="p-1">
						<TextArea 
							placeholder="Character appearance, clothing, etc."
							value={character.positivePrompt}
							onChange={e => onChange({ positivePrompt: e.target.value })}
							style={{ width: '100%', minHeight: '100px' }}
						/>
					</Tabs.Content>
					
					<Tabs.Content value="negative" className="p-1">
						<TextArea 
							placeholder="What to avoid in character appearance"
							value={character.negativePrompt}
							onChange={e => onChange({ negativePrompt: e.target.value })}
							style={{ width: '100%', minHeight: '100px' }}
						/>
					</Tabs.Content>
					
					<Tabs.Content value="positioning" className="p-1">
						<TextArea 
							placeholder="Character position and pose (optional)"
							value={character.positioning}
							onChange={e => onChange({ positioning: e.target.value })}
							style={{ width: '100%', minHeight: '100px' }}
						/>
					</Tabs.Content>
				</Tabs.Root>
			</Flex>
		</Card>
	);
} 