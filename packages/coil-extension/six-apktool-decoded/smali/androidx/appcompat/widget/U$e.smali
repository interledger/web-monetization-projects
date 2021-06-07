.class Landroidx/appcompat/widget/U$e;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/widget/U;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "e"
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/widget/U;


# direct methods
.method constructor <init>(Landroidx/appcompat/widget/U;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/U$e;->a:Landroidx/appcompat/widget/U;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/widget/U$e;->a:Landroidx/appcompat/widget/U;

    iget-object v0, v0, Landroidx/appcompat/widget/U;->f:Landroidx/appcompat/widget/N;

    if-eqz v0, :cond_0

    invoke-static {v0}, La/g/i/s;->v(Landroid/view/View;)Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/appcompat/widget/U$e;->a:Landroidx/appcompat/widget/U;

    iget-object v0, v0, Landroidx/appcompat/widget/U;->f:Landroidx/appcompat/widget/N;

    invoke-virtual {v0}, Landroid/widget/ListView;->getCount()I

    move-result v0

    iget-object v1, p0, Landroidx/appcompat/widget/U$e;->a:Landroidx/appcompat/widget/U;

    iget-object v1, v1, Landroidx/appcompat/widget/U;->f:Landroidx/appcompat/widget/N;

    invoke-virtual {v1}, Landroid/widget/ListView;->getChildCount()I

    move-result v1

    if-le v0, v1, :cond_0

    iget-object v0, p0, Landroidx/appcompat/widget/U$e;->a:Landroidx/appcompat/widget/U;

    iget-object v0, v0, Landroidx/appcompat/widget/U;->f:Landroidx/appcompat/widget/N;

    invoke-virtual {v0}, Landroid/widget/ListView;->getChildCount()I

    move-result v0

    iget-object v1, p0, Landroidx/appcompat/widget/U$e;->a:Landroidx/appcompat/widget/U;

    iget v2, v1, Landroidx/appcompat/widget/U;->s:I

    if-gt v0, v2, :cond_0

    iget-object v0, v1, Landroidx/appcompat/widget/U;->J:Landroid/widget/PopupWindow;

    const/4 v1, 0x2

    invoke-virtual {v0, v1}, Landroid/widget/PopupWindow;->setInputMethodMode(I)V

    iget-object v0, p0, Landroidx/appcompat/widget/U$e;->a:Landroidx/appcompat/widget/U;

    invoke-virtual {v0}, Landroidx/appcompat/widget/U;->c()V

    :cond_0
    return-void
.end method
