import { Box, Flex, Button, Text } from '@radix-ui/themes';
import * as RadixIcons from '@radix-ui/react-icons';
import CharacterPrompt from './CharacterPrompt';

export type CharacterType = 'Female' | 'Male' | 'Other';
export type Character = {
	id: string;
	type: CharacterType;
	positivePrompt: string;
	negativePrompt: string;
	positioning: string;
};

interface CharactersAreaProps {
	characters: Character[];
	onCharactersChange: (characters: Character[]) => void;
}

export default function CharactersArea({ characters, onCharactersChange }: CharactersAreaProps) {
	const addCharacter = (type: CharacterType) => {
		const newCharacter: Character = {
			id: Date.now().toString(),
			type,
			positivePrompt: '',
			negativePrompt: '',
			positioning: ''
		};
		onCharactersChange([...characters, newCharacter]);
	};

	const updateCharacter = (id: string, changes: Partial<Character>) => {
		onCharactersChange(
			characters.map(char => 
				char.id === id ? { ...char, ...changes } : char
			)
		);
	};

	const removeCharacter = (id: string) => {
		onCharactersChange(characters.filter(char => char.id !== id));
	};

	return (
		<Flex direction="column" style={{ width: '100%', height: '100%' }}>
			<Flex direction="row" justify="between" align="start" gap="4" style={{ height: '100%' }} >
				<Flex justify="between" align="center" mb="3" style={{ flexGrow: 0 }}>
					<Flex gap="2" direction="column">
						<Text size="3" weight="bold">Characters</Text>

						<Button 
							onClick={() => addCharacter('Female')} 
							variant="soft" 
							color="violet"
							style={{ justifyContent: 'flex-start', gap: '4px', width: '100px' }}
						>
							<RadixIcons.PlusIcon /> Female
						</Button>
						<Button 
							onClick={() => addCharacter('Male')} 
							variant="soft" 
							color="blue"
							style={{ justifyContent: 'flex-start', gap: '4px', width: '100px' }}
						>
							<RadixIcons.PlusIcon /> Male
						</Button>
						<Button 
							onClick={() => addCharacter('Other')} 
							variant="soft" 
							color="green"
							style={{ justifyContent: 'flex-start', gap: '4px', width: '100px' }}
						>
							<RadixIcons.PlusIcon /> Other
						</Button>
					</Flex>
				</Flex>

				{characters.length === 0 ? (
					<Box 
						style={{
							padding: '2rem',
							textAlign: 'center',
							border: '1px dashed var(--gray-6)',
							borderRadius: 'var(--radius-3)',
							height: '100%',
							flexGrow: 1
						}}
					>
						<Text color="gray">Add characters to your scene using the buttons above</Text>
					</Box>
				) : (
					<Box style={{ overflowY: 'auto', height: '100%', flexGrow: 1 }}>
						<Flex wrap="wrap" gap="4">
							{characters.map(character => (
								<Box 
									key={character.id} 
									style={{ 
										flexBasis: characters.length <= 3 ? `calc(${100 / Math.min(characters.length, 3)}% - 1rem)` : 'calc(33.33% - 1rem)',
										flexGrow: 1,
										minWidth: '250px'
									}}
								>
									<CharacterPrompt
										character={character}
										onChange={(changes: Partial<Character>) => updateCharacter(character.id, changes)}
										onRemove={() => removeCharacter(character.id)}
									/>
								</Box>
							))}
						</Flex>
					</Box>
				)}
			</Flex>
		</Flex>
	);
} 