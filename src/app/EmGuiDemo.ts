import { ImGui } from './ImGuiRenderer';

export default class EmGuiDemo {
  private static versions: Record<string, string> = {};

  static init() {
    const elem = document.getElementById('app');
    const versionsData = elem.getAttribute('data-versions');

    // We got something? convert to object from JSON
    if (versionsData) {
      this.versions = JSON.parse(versionsData);
    }
  }

  static show(deltaTime: number) {
    const teaserColor = new ImGui.Color(180 / 255, 180 / 255, 180 / 255);
    const color1 = new ImGui.Color(134 / 255, 175 / 255, 222 / 255);
    const greenColor = new ImGui.Color(128 / 255, 203 / 255, 147 / 255);
    const teaser =
      'Electron ImGui (EmGui) is a minimal boilerplate for writing Desktop (Realtime) Graphics Applications using Electron, ImGui, OpenGL, Webpack & TypeScript';

    ImGui.SetNextWindowSize(
      new ImGui.ImVec2(450, 200),
      ImGui.Cond.FirstUseEver,
    );
    ImGui.Begin('Electron ImGui Demo');
    {
      ImGui.Text('Welcome to Electron ImGui (EmGui) Boilerplate');
      ImGui.Separator();
      ImGui.Spacing();
      ImGui.PushTextWrapPos();
      ImGui.TextColored(teaserColor, teaser);
      ImGui.PopTextWrapPos();

      ImGui.Spacing();
      ImGui.Spacing();

      ImGui.Text('Electron :');
      ImGui.SameLine();
      ImGui.TextColored(color1, this.versions['electron']);

      ImGui.Text('ImGui :');
      ImGui.SameLine();
      ImGui.TextColored(color1, ImGui.GetVersion());

      ImGui.Text('Chrome :');
      ImGui.SameLine();
      ImGui.TextColored(color1, this.versions['chrome']);

      ImGui.Text('NodeJS :');
      ImGui.SameLine();
      ImGui.TextColored(color1, this.versions['node']);

      ImGui.Separator();
      ImGui.Spacing();

      ImGui.TextColored(
        greenColor,
        'Frames Per Second : ' + (1 / deltaTime).toFixed(3),
      );
    }
    ImGui.End();
  }
}
