.class Landroidx/appcompat/widget/g$c;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/widget/g;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "c"
.end annotation


# instance fields
.field private a:Landroidx/appcompat/widget/g$e;

.field final synthetic b:Landroidx/appcompat/widget/g;


# direct methods
.method public constructor <init>(Landroidx/appcompat/widget/g;Landroidx/appcompat/widget/g$e;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/g$c;->b:Landroidx/appcompat/widget/g;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p2, p0, Landroidx/appcompat/widget/g$c;->a:Landroidx/appcompat/widget/g$e;

    return-void
.end method


# virtual methods
.method public run()V
    .locals 2

    iget-object v0, p0, Landroidx/appcompat/widget/g$c;->b:Landroidx/appcompat/widget/g;

    invoke-static {v0}, Landroidx/appcompat/widget/g;->d(Landroidx/appcompat/widget/g;)Landroidx/appcompat/view/menu/l;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/appcompat/widget/g$c;->b:Landroidx/appcompat/widget/g;

    invoke-static {v0}, Landroidx/appcompat/widget/g;->e(Landroidx/appcompat/widget/g;)Landroidx/appcompat/view/menu/l;

    move-result-object v0

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/l;->a()V

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/g$c;->b:Landroidx/appcompat/widget/g;

    invoke-static {v0}, Landroidx/appcompat/widget/g;->f(Landroidx/appcompat/widget/g;)Landroidx/appcompat/view/menu/w;

    move-result-object v0

    check-cast v0, Landroid/view/View;

    if-eqz v0, :cond_1

    invoke-virtual {v0}, Landroid/view/View;->getWindowToken()Landroid/os/IBinder;

    move-result-object v0

    if-eqz v0, :cond_1

    iget-object v0, p0, Landroidx/appcompat/widget/g$c;->a:Landroidx/appcompat/widget/g$e;

    invoke-virtual {v0}, Landroidx/appcompat/view/menu/u;->f()Z

    move-result v0

    if-eqz v0, :cond_1

    iget-object v0, p0, Landroidx/appcompat/widget/g$c;->b:Landroidx/appcompat/widget/g;

    iget-object v1, p0, Landroidx/appcompat/widget/g$c;->a:Landroidx/appcompat/widget/g$e;

    iput-object v1, v0, Landroidx/appcompat/widget/g;->z:Landroidx/appcompat/widget/g$e;

    :cond_1
    iget-object v0, p0, Landroidx/appcompat/widget/g$c;->b:Landroidx/appcompat/widget/g;

    const/4 v1, 0x0

    iput-object v1, v0, Landroidx/appcompat/widget/g;->B:Landroidx/appcompat/widget/g$c;

    return-void
.end method
