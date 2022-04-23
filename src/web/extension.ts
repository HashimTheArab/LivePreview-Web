// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('live-preview--web-.livePreview', () => {
		if (vscode.window.activeTextEditor?.document?.languageId !== 'html') {
			vscode.window.showErrorMessage('Live Preview only works on HTML files.');
			return;
		}

		const panel = vscode.window.createWebviewPanel(
			'live-preview--web-', // Identifies the type of the webview. Used internally
			'Live Preview', // Title of the panel displayed to the user
			vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
			{
				enableScripts: true,
				retainContextWhenHidden: true,
				enableFindWidget: true,
			}
		);

		panel.webview.html = vscode.window.activeTextEditor.document.getText();
		vscode.workspace.onDidSaveTextDocument(document => {
			panel.webview.html = document.getText();
		});
	});

	context.subscriptions.push(disposable);

	let button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
	button.text = "Live Preview (Web)";
	button.tooltip = "Start Live Preview!";
	button.backgroundColor = new vscode.ThemeColor('statusBar.background');
	button.command = 'live-preview--web-.livePreview';
	button.show();
}

// this method is called when your extension is deactivated
export function deactivate() { }
