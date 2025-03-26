import { Button, Flex, Text, Card, Box, Dialog, DropdownMenu } from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';

export default function RadixExample() {
	return (
		<Box className="p-6">
			<Card className="mb-6">
				<Flex direction="column" gap="4">
					<Text size="5" weight="bold">Radix UI Components Example</Text>
					
					{/* Button Example */}
					<Flex gap="4">
						<Button variant="solid">Solid Button</Button>
						<Button variant="soft">Soft Button</Button>
						<Button variant="outline">Outline Button</Button>
					</Flex>
					
					{/* Tabs Example */}
					<Tabs.Root defaultValue="tab1">
						<Tabs.List className="flex border-b mb-2">
							<Tabs.Trigger 
								value="tab1" 
								className="px-4 py-2 hover:bg-zinc-800 dark:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-violet-500"
							>
								Tab 1
							</Tabs.Trigger>
							<Tabs.Trigger 
								value="tab2" 
								className="px-4 py-2 hover:bg-zinc-800 dark:text-zinc-100 data-[state=active]:border-b-2 data-[state=active]:border-violet-500"
							>
								Tab 2
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="tab1" className="p-2">
							<Text>Content for Tab 1</Text>
						</Tabs.Content>
						<Tabs.Content value="tab2" className="p-2">
							<Text>Content for Tab 2</Text>
						</Tabs.Content>
					</Tabs.Root>
					
					{/* Dialog Example - Using Radix UI Theme Dialog */}
					<Dialog.Root>
						<Dialog.Trigger>
							<Button>Open Dialog</Button>
						</Dialog.Trigger>
						
						<Dialog.Content style={{ maxWidth: 450 }}>
							<Dialog.Title>Dialog Title</Dialog.Title>
							<Dialog.Description size="2" mb="4">
								This is a description of the dialog content.
							</Dialog.Description>

							<Flex gap="3" mt="4" justify="end">
								<Dialog.Close>
									<Button variant="soft" color="gray">Cancel</Button>
								</Dialog.Close>
								<Dialog.Close>
									<Button>Confirm</Button>
								</Dialog.Close>
							</Flex>
						</Dialog.Content>
					</Dialog.Root>
					
					{/* Dropdown Menu Example - Using Radix UI Theme DropdownMenu */}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button variant="outline">Open Menu</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item>Item 1</DropdownMenu.Item>
							<DropdownMenu.Item>Item 2</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>Item 3</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Flex>
			</Card>
		</Box>
	);
} 