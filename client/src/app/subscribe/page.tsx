import SubscribeList from '../../components/subscribeList';

export default function SubscribePage() {
  const dummyArr = [
    {
      name: 'zeus',
      isLive: true,
      isSubscribe: true
    },
    {
      name: 'peanut',
      isLive: false,
      isSubscribe: true
    },
    {
      name: 'zeka',
      isLive: true,
      isSubscribe: false
    },
    {
      name: 'viper',
      isLive: true,
      isSubscribe: true
    },
    {
      name: 'delight',
      isLive: true,
      isSubscribe: true
    }
  ];
  return (
    <>
      <SubscribeList list={dummyArr} />
    </>
  );
}
