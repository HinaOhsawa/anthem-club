import { useEffect, useState } from "react";

//--------------------------------------------------
// 確認モーダル
//--------------------------------------------------
const STORAGE_KEY = "anthem_quiz_alerted";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const useConfirmModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const alertedData = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (alertedData) {
      try {
        const { expiresAt } = JSON.parse(alertedData);
        if (now < expiresAt) return; // 期限内 → 何もしない
      } catch {
        // JSON.parseエラー時も続行
      }
    }

    // モーダル表示 & 期限をセット
    const expiresAt = now + ONE_DAY_MS;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ expiresAt }));
    setShowModal(true);
  }, []);

  const closeModal = () => setShowModal(false);

  return {
    showModal,
    closeModal,
  };
};
