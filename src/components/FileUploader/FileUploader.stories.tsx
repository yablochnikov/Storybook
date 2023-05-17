import { Meta, StoryObj } from '@storybook/react';
import FileUploader from './FileUploader';

const ArgTypes = {
	title: {
		name: 'title',
		description: 'Title of the file uploader',
		defaultValue: 'Choose a file or drag it here',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Choose a file or drag it here' },
		},
	},
	listTitle: {
		name: 'listTitle',
		description: 'Title of the files list',
		defaultValue: 'Files',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Files' },
		},
	},
	removeButtonLabel: {
		name: 'removeButtonLabel',
		description: 'Label of the remove button',
		defaultValue: 'Remove',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Remove' },
		},
	},
	submitButtonLabel: {
		name: 'submitButtonLabel',
		description: 'Label of the submit button',
		defaultValue: 'Submit',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Submit' },
		},
	},
	submitButtonCallback: {
		name: 'submitButtonCallback',
		description: 'Callback of the submit button',
	},
	isSkeleton: {
		name: 'isSkeleton',
		description: 'If true, the file uploader will be shown as a skeleton',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	uploaderRootStyles: {
		name: 'uploaderRootStyles',
		description: 'Styles of the uploader root',
	},
	dragDropContainerStyles: {
		name: 'dragDropContainerStyles',
		description: 'Styles of the drag and drop container',
	},
	uploaderTitleStyles: {
		name: 'uploaderTitleStyles',
		description: 'Styles of the uploader title',
	},
};

/**
 * The File Uploader component is a user-friendly tool that enables seamless and efficient file uploading within applications. With its intuitive interface, users can easily select and upload files from their local devices to the designated system. Whether it's images, documents, or multimedia files, this component simplifies the process by providing progress indicators, drag-and-drop functionality, and error handling. It enhances user experience by allowing batch uploads, supports various file formats, and ensures the security and integrity of the uploaded files. The File Uploader component streamlines file management, making it a valuable asset for any application that requires file handling capabilities.
 */
const meta: Meta<typeof FileUploader> = {
	title: 'Components/FileUploader',
	component: FileUploader,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const DefaultCalendar: Story = {
	args: {
		title: 'Choose a file or drag it here',
		listTitle: 'Files',
		removeButtonLabel: 'Remove',
		submitButtonLabel: 'Submit',
		submitButtonCallback: () => console.log('submit'),
		isSkeleton: false,
	},
};
