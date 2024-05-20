export default function UserCard({ users }) {
    
  return( 
    <div className="list-container mt-8 flex flex-col gap-2 h-full">
    {users.map((user) => {
        return (
            <div className="w-full h-16 bg-[#EEDBDB] rounded-xl px-4 py-2">
                <div className="flex h-full items-center gap-3">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-black">{user.name}</h1>
                    </div>
        
                    <div className="spacer mx-auto"></div>
                    
                    <div className="flex justify-between items-center">
                        <div className="flex items-end gap-1">
                            <div className="font-black">{user.email}</div>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    })}
    </div>
  );
}
