import { renderHook } from "@testing-library/react-hooks";
import { useResolvedDirection } from "./useResolvedDirection";

describe("useResolvedDirection hook", () => {
  it("should return rtl for locale 'ar'", () => {
    const { result } = renderHook(() => useResolvedDirection(undefined, "ar"));
    expect(result.current).toEqual("rtl");
  });
  it("should return rtl for locale 'ar-EG'", () => {
    const { result } = renderHook(() =>
      useResolvedDirection(undefined, "ar-EG")
    );
    expect(result.current).toEqual("rtl");
  });
  it("should return ltr for locale 'fr'", () => {
    const { result } = renderHook(() => useResolvedDirection(undefined, "fr"));
    expect(result.current).toEqual("ltr");
  });
  it("should return ltr for locale 'fr-TN'", () => {
    const { result } = renderHook(() =>
      useResolvedDirection(undefined, "fr-TN")
    );
    expect(result.current).toEqual("ltr");
  });
  it("should give precendence to a passed direction regardless of locale", () => {
    const { result } = renderHook(() => useResolvedDirection("ltr", "ar-EG"));
    expect(result.current).toEqual("ltr");
  });
  it("should default to LTR if no locale or direction passed", () => {
    const { result } = renderHook(() =>
      useResolvedDirection(undefined, undefined)
    );
    expect(result.current).toEqual("ltr");
  });
  it("should default to LTR if no recognised locale or direction passed", () => {
    const { result } = renderHook(() =>
      useResolvedDirection(undefined, "somelanguage")
    );
    expect(result.current).toEqual("ltr");
  });
});
