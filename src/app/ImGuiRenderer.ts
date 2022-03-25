import 'systemjs';
import * as ImGuiType from '@misc/imgui-js/build/imgui';
import * as ImGui_Base from '@misc/imgui-js/dist/imgui.umd';
import * as ImGui_Impl_Base from '@misc/imgui-js/dist/imgui_impl.umd';
import ImGuiApp from './ImGuiApp';

// ImGui Namespace
export const ImGui = ImGui_Base as typeof ImGuiType;

// ImGui Implementation
export const ImGui_Impl = ImGui_Impl_Base;

// ImGui Renderer
export class ImGuiRenderer {
  private deltaTime = 0;
  private elapsedTime = 0;
  private clearColor = new ImGui.ImVec4(23 / 255, 27 / 255, 33 / 255, 1.0);
  private app = new ImGuiApp();

  async Setup(canvas: HTMLCanvasElement): Promise<void> {
    // Defaults ImGui
    await ImGui.default();

    // Canvas Pixel Ratio
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.scrollWidth * pixelRatio;
    canvas.height = canvas.scrollHeight * pixelRatio;

    // Handle pixel ratio when resizing window
    window.addEventListener('resize', () => {
      const newPixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.scrollWidth * newPixelRatio;
      canvas.height = canvas.scrollHeight * newPixelRatio;
    });

    // Create ImGui Context & Implement into canvas
    ImGui.CreateContext();
    ImGui_Impl.Init(canvas);

    // Initialize ImGui App
    this.app.init();

    // Request Animation Frame
    window.requestAnimationFrame(this.loop.bind(this));
  }

  private loop(time: number) {
    if (this.elapsedTime != undefined) {
      this.deltaTime = (time - this.elapsedTime) / 1000;
      // Update logic based on delta time here..
      this.render(this.deltaTime);
    }

    // Set elapsed time to current time
    this.elapsedTime = time;
  }

  private render(deltaTime: number) {
    const { clearColor, app } = this;

    // Setup New ImGui Frame
    ImGui_Impl.NewFrame(deltaTime);
    ImGui.NewFrame();

    // Draw Something using ImGui App
    app.draw(deltaTime);

    // Finish Frame to Render
    ImGui.EndFrame();
    ImGui.Render();

    // Clear screen buffers
    const gl = ImGui_Impl.gl;
    gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl && gl.clearColor(clearColor.x, clearColor.y, clearColor.z, clearColor.w);
    gl && gl.clear(gl.COLOR_BUFFER_BIT);

    // Render Imgui Drawing Data
    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());

    // Continue Rendering till we stop
    window.requestAnimationFrame(
      app.running ? this.loop.bind(this) : this.terminate.bind(this),
    );
  }

  terminate() {
    ImGui_Impl.Shutdown();
    ImGui.DestroyContext();
  }
}
