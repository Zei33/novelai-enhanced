import { Box, Text, TextArea } from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';

interface ScenePromptProps {
	positivePrompt: string;
	negativePrompt: string;
	onPositivePromptChange: (value: string) => void;
	onNegativePromptChange: (value: string) => void;
}

export default function ScenePrompt({ 
	positivePrompt, 
	negativePrompt, 
	onPositivePromptChange, 
	onNegativePromptChange 
}: ScenePromptProps) {
	return (
		<Box style={{ width: '100%' }}>
			<Tabs.Root defaultValue="positive">
				<Tabs.List className="flex border-b mb-2">
					<Tabs.Trigger 
						value="positive" 
						className="px-4 py-2 hover:bg-zinc-800 dark:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-violet-500"
					>
						Positive
					</Tabs.Trigger>
					<Tabs.Trigger 
						value="negative" 
						className="px-4 py-2 hover:bg-zinc-800 dark:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-violet-500"
					>
						Negative
					</Tabs.Trigger>
				</Tabs.List>
				
				<Tabs.Content value="positive" className="p-1">
					<TextArea 
						placeholder="Describe what should be in the scene (tags separated by commas)"
						value={positivePrompt}
						onChange={e => onPositivePromptChange(e.target.value)}
						style={{ width: '100%', minHeight: '120px' }}
					/>
				</Tabs.Content>
				
				<Tabs.Content value="negative" className="p-1">
					<TextArea 
						placeholder="Describe what should NOT be in the scene (tags separated by commas)"
						value={negativePrompt}
						onChange={e => onNegativePromptChange(e.target.value)}
						style={{ width: '100%', minHeight: '120px' }}
					/>
				</Tabs.Content>
			</Tabs.Root>
		</Box>
	);
} 