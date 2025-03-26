import { Dialog, Flex, Text, Slider, TextField, Select } from '@radix-ui/themes';

interface SettingsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	settings: {
		steps: number;
		promptGuidance: number;
		seed: string;
		sampler: string;
	};
	onSettingsChange: (settings: Partial<SettingsDialogProps['settings']>) => void;
}

export default function SettingsDialog({ 
	open, 
	onOpenChange, 
	settings, 
	onSettingsChange 
}: SettingsDialogProps) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Content style={{ maxWidth: 450 }}>
				<Dialog.Title>Advanced Settings</Dialog.Title>
				
				<Flex direction="column" gap="4" my="4">
					<Flex direction="column" gap="2">
						<Text size="2" weight="bold">Steps: {settings.steps}</Text>
						<Slider 
							value={[settings.steps]} 
							min={1} 
							max={50} 
							step={1}
							onValueChange={values => onSettingsChange({ steps: values[0] })}
						/>
						<Text size="1" color="gray">Higher values (20-28) give better results but take longer. Values over 28 give diminishing returns.</Text>
					</Flex>
					
					<Flex direction="column" gap="2">
						<Text size="2" weight="bold">Prompt Guidance: {settings.promptGuidance}</Text>
						<Slider 
							value={[settings.promptGuidance]} 
							min={0} 
							max={10} 
							step={0.1}
							onValueChange={values => onSettingsChange({ promptGuidance: values[0] })}
						/>
						<Text size="1" color="gray">How closely to follow the prompt. Higher values (7-10) follow it more closely but may cause artifacts.</Text>
					</Flex>
					
					<Flex direction="column" gap="2">
						<Text size="2" weight="bold">Seed</Text>
						<TextField.Root 
							placeholder="Leave blank for random" 
							value={settings.seed}
							onChange={e => onSettingsChange({ seed: e.target.value })}
						/>
						<Text size="1" color="gray">Used to reproduce exact images. Leave blank for random generation.</Text>
					</Flex>
					
					<Flex direction="column" gap="2">
						<Text size="2" weight="bold">Sampler</Text>
						<Select.Root 
							value={settings.sampler} 
							onValueChange={value => onSettingsChange({ sampler: value })}
						>
							<Select.Trigger />
							<Select.Content>
								<Select.Item value="euler_ancestral">Euler Ancestral</Select.Item>
								<Select.Item value="dpm_2s_ancestral">DPM++ 2S Ancestral</Select.Item>
								<Select.Item value="dpm_2m_sde">DPM++ 2M SDE</Select.Item>
							</Select.Content>
						</Select.Root>
						<Text size="1" color="gray">Different samplers produce different aesthetic results.</Text>
					</Flex>
				</Flex>
				
				<Flex gap="3" justify="end">
					<Dialog.Close>
						<Dialog.Close>
							Close
						</Dialog.Close>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
} 