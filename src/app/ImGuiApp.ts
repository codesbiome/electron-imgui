import EmGuiDemo from './EmGuiDemo';
import { ImGui } from './ImGuiRenderer';

export default class ImGuiApp {
  public running = true;


  init() {
    // Use Dark style colors for ImGui
    ImGui.StyleColorsDark();

    // EmGui Demo Init
    EmGuiDemo.init();
  }

  draw(deltaTime: number) {
    EmGuiDemo.show(deltaTime);
  }
}
