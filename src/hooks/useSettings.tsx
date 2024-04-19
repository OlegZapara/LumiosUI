import { RootState } from "@/app/store";
import { SettingsState, syncSettings } from "@/slices/settings-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useSettings() {
  const dispatch = useDispatch();
  const settings = useSelector<RootState, SettingsState>(
    (state) => state.settings
  );

  useEffect(() => {
    dispatch(syncSettings());
  }, [dispatch]);
  return settings;
}
