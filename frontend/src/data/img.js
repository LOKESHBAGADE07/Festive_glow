export const px = (id, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const us = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

/* Studio set — one shoot, one backdrop (ivory linen, oak, window light).
   Replace with real product photography in Shopify; keep the same framing. */
const SHOOT = "https://static.prod-images.emergentagent.com/jobs/090572b8-9d87-42de-ab8c-856f0d2c47ef/images/";
export const SHOT = {
  studio_lanterns: `${SHOOT}4b077379f23f56425f16b306c413b79ee20e079979f5d55442e6800f7e16f067.jpeg`,
  life_lanterns: `${SHOOT}0cd48cf9649363bf0179b27682d3400a405a782a62be8657d384dacfa42803ba.jpeg`,
  studio_diyas: `${SHOOT}b69e909bfdf27039398b163e746d167d6df76b85f23d3e3dcf679103ec4a7c94.jpeg`,
  life_diyas: `${SHOOT}6435e3eb42544f1c92ad78887af83edfe50fb98f09c19e1bdff586c684597ee6.jpeg`,
  studio_fairylights: `${SHOOT}479e87b3cef2e0fa7146d901d74dce52b46452bc24cba2d00cb8aad95898069a.jpeg`,
  life_fairylights: `${SHOOT}355900d71ec2eedf4ca8d711bc70073c59df01ef55a27fafba49460a2d3533d7.jpeg`,
  studio_giftbox: `${SHOOT}464c9204f4dead433f3841bdb58167bb95bcbae6bd5178315c66aab1ac1f9488.jpeg`,
  life_giftbox: `${SHOOT}353e5a1045486ed9ca319134cb1ba2ae3a7b5999cf2ad28170b455291b91273d.jpeg`,
  studio_toran: `${SHOOT}8aa41662e18af32747e5efc348f931e374e7af463166ea03df9c72ef9da15e48.jpeg`,
  life_toran: `${SHOOT}1c554897168840c75a1b360d57c265d9a7f4beec37961ac504cee85950f078d6.jpeg`,
};
