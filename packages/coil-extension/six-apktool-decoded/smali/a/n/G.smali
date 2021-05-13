.class La/n/G;
.super La/n/F;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/n/H$a;->onPreDraw()Z
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/d/b;

.field final synthetic b:La/n/H$a;


# direct methods
.method constructor <init>(La/n/H$a;La/d/b;)V
    .locals 0

    iput-object p1, p0, La/n/G;->b:La/n/H$a;

    iput-object p2, p0, La/n/G;->a:La/d/b;

    invoke-direct {p0}, La/n/F;-><init>()V

    return-void
.end method


# virtual methods
.method public c(La/n/E;)V
    .locals 2

    iget-object v0, p0, La/n/G;->a:La/d/b;

    iget-object v1, p0, La/n/G;->b:La/n/H$a;

    iget-object v1, v1, La/n/H$a;->b:Landroid/view/ViewGroup;

    invoke-virtual {v0, v1}, La/d/i;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Ljava/util/ArrayList;

    invoke-virtual {v0, p1}, Ljava/util/ArrayList;->remove(Ljava/lang/Object;)Z

    return-void
.end method
