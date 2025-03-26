import { Flex, Box, Select, Text, TextField, Button } from '@radix-ui/themes';
import * as RadixIcons from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
// import SettingsDialog from './SettingsDialog';

type ImageSize = 'portrait' | 'landscape' | 'square' | 'custom';

interface ImageSizeDetails {
	width: number;
	height: number;
}

const IMAGE_SIZE_PRESETS: Record<Exclude<ImageSize, 'custom'>, ImageSizeDetails> = {
	portrait: { width: 832, height: 1216 },
	landscape: { width: 1216, height: 832 },
	square: { width: 1024, height: 1024 },
};

interface ImageSettingsProps {
	onGenerate: () => void;
	settings: {
		width: number;
		height: number;
		steps: number;
		promptGuidance: number;
		seed: string;
		sampler: string;
	};
	onSettingsChange: (settings: Partial<ImageSettingsProps['settings']>) => void;
}

export default function ImageSettings({ onGenerate, settings, onSettingsChange }: ImageSettingsProps) {
	const [selectedSize, setSelectedSize] = useState<ImageSize>('landscape');
	// Will be used when settings dialog is implemented
	// const [settingsOpen, setSettingsOpen] = useState(false);

	// Initialize dimensions to landscape on mount
	useEffect(() => {
		// Set to landscape dimensions on component mount
		onSettingsChange({
			width: IMAGE_SIZE_PRESETS.landscape.width,
			height: IMAGE_SIZE_PRESETS.landscape.height
		});
	}, []); // Empty dependency array means this runs once on mount

	// Update selected size when width/height change
	useEffect(() => {
		// This should run after initial dimensions are set
		for (const [key, value] of Object.entries(IMAGE_SIZE_PRESETS)) {
			if (value.width === settings.width && value.height === settings.height) {
				setSelectedSize(key as ImageSize);
				return;
			}
		}
		setSelectedSize('custom');
	}, [settings.width, settings.height]);

	// Update width/height when preset changes
	const handleSizeChange = (size: ImageSize) => {
		setSelectedSize(size);
		if (size !== 'custom') {
			onSettingsChange({
				width: IMAGE_SIZE_PRESETS[size].width,
				height: IMAGE_SIZE_PRESETS[size].height
			});
		}
	};

	return (
		<Box>
			<Flex gap="2">
				<Box style={{ flexGrow: 1 }}>
					<Text size="2" mb="1">Image Size</Text>
					<Select.Root 
						value={selectedSize} 
						onValueChange={handleSizeChange as (value: string) => void}
					>
						<Select.Trigger style={{ width: '100%' }} />
						<Select.Content style={{ width: '100%' }}>
							<Select.Group>
								<Select.Item value="portrait">Portrait</Select.Item>
								<Select.Item value="landscape">Landscape</Select.Item>
								<Select.Item value="square">Square</Select.Item>
								<Select.Item value="custom">Custom</Select.Item>
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</Box>

				<Box>
					<Text size="2" mb="1">Width</Text>
					<TextField.Root 
						type="number" 
						value={settings.width.toString()} 
						onChange={e => {
							const width = parseInt(e.target.value);
							if (!isNaN(width)) {
								onSettingsChange({ width });
							}
						}}
						style={{ width: '80px' }}
					/>
				</Box>

				<Box>
					<Text size="2" mb="1">Height</Text>
					<TextField.Root 
						type="number" 
						value={settings.height.toString()} 
						onChange={e => {
							const height = parseInt(e.target.value);
							if (!isNaN(height)) {
								onSettingsChange({ height });
							}
						}}
						style={{ width: '80px' }}
					/>
				</Box>
			</Flex>

			<Flex gap="2" mt="4" ml="auto">
				<Button onClick={onGenerate} style={{ flexGrow: 1 }}>Generate Image</Button>
				<Button variant="soft" onClick={() => {/* Settings dialog will be implemented later */}}>
					<RadixIcons.GearIcon />
				</Button>
			</Flex>

			{/* Settings dialog will be implemented later */}
			{/* <SettingsDialog 
				open={settingsOpen} 
				onOpenChange={setSettingsOpen}
				settings={settings}
				onSettingsChange={onSettingsChange}
			/> */}
		</Box>
	);
} 