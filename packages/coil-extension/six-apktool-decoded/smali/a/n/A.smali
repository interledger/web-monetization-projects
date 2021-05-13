.class public La/n/A;
.super Ljava/lang/Object;
.source ""


# instance fields
.field private a:Landroid/view/ViewGroup;

.field private b:Ljava/lang/Runnable;


# direct methods
.method static a(Landroid/view/View;)La/n/A;
    .locals 1

    sget v0, La/n/y;->transition_current_scene:I

    invoke-virtual {p0, v0}, Landroid/view/View;->getTag(I)Ljava/lang/Object;

    move-result-object p0

    check-cast p0, La/n/A;

    return-object p0
.end method

.method static a(Landroid/view/View;La/n/A;)V
    .locals 1

    sget v0, La/n/y;->transition_current_scene:I

    invoke-virtual {p0, v0, p1}, Landroid/view/View;->setTag(ILjava/lang/Object;)V

    return-void
.end method


# virtual methods
.method public a()V
    .locals 1

    iget-object v0, p0, La/n/A;->a:Landroid/view/ViewGroup;

    invoke-static {v0}, La/n/A;->a(Landroid/view/View;)La/n/A;

    move-result-object v0

    if-ne v0, p0, :cond_0

    iget-object v0, p0, La/n/A;->b:Ljava/lang/Runnable;

    if-eqz v0, :cond_0

    invoke-interface {v0}, Ljava/lang/Runnable;->run()V

    :cond_0
    return-void
.end method
