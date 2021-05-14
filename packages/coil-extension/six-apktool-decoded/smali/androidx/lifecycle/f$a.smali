.class public final enum Landroidx/lifecycle/f$a;
.super Ljava/lang/Enum;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/lifecycle/f;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x4019
    name = "a"
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Enum<",
        "Landroidx/lifecycle/f$a;",
        ">;"
    }
.end annotation


# static fields
.field private static final synthetic $VALUES:[Landroidx/lifecycle/f$a;

.field public static final enum ON_ANY:Landroidx/lifecycle/f$a;

.field public static final enum ON_CREATE:Landroidx/lifecycle/f$a;

.field public static final enum ON_DESTROY:Landroidx/lifecycle/f$a;

.field public static final enum ON_PAUSE:Landroidx/lifecycle/f$a;

.field public static final enum ON_RESUME:Landroidx/lifecycle/f$a;

.field public static final enum ON_START:Landroidx/lifecycle/f$a;

.field public static final enum ON_STOP:Landroidx/lifecycle/f$a;


# direct methods
.method static constructor <clinit>()V
    .locals 9

    new-instance v0, Landroidx/lifecycle/f$a;

    const/4 v1, 0x0

    const-string v2, "ON_CREATE"

    invoke-direct {v0, v2, v1}, Landroidx/lifecycle/f$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, Landroidx/lifecycle/f$a;->ON_CREATE:Landroidx/lifecycle/f$a;

    new-instance v0, Landroidx/lifecycle/f$a;

    const/4 v2, 0x1

    const-string v3, "ON_START"

    invoke-direct {v0, v3, v2}, Landroidx/lifecycle/f$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, Landroidx/lifecycle/f$a;->ON_START:Landroidx/lifecycle/f$a;

    new-instance v0, Landroidx/lifecycle/f$a;

    const/4 v3, 0x2

    const-string v4, "ON_RESUME"

    invoke-direct {v0, v4, v3}, Landroidx/lifecycle/f$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, Landroidx/lifecycle/f$a;->ON_RESUME:Landroidx/lifecycle/f$a;

    new-instance v0, Landroidx/lifecycle/f$a;

    const/4 v4, 0x3

    const-string v5, "ON_PAUSE"

    invoke-direct {v0, v5, v4}, Landroidx/lifecycle/f$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, Landroidx/lifecycle/f$a;->ON_PAUSE:Landroidx/lifecycle/f$a;

    new-instance v0, Landroidx/lifecycle/f$a;

    const/4 v5, 0x4

    const-string v6, "ON_STOP"

    invoke-direct {v0, v6, v5}, Landroidx/lifecycle/f$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, Landroidx/lifecycle/f$a;->ON_STOP:Landroidx/lifecycle/f$a;

    new-instance v0, Landroidx/lifecycle/f$a;

    const/4 v6, 0x5

    const-string v7, "ON_DESTROY"

    invoke-direct {v0, v7, v6}, Landroidx/lifecycle/f$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, Landroidx/lifecycle/f$a;->ON_DESTROY:Landroidx/lifecycle/f$a;

    new-instance v0, Landroidx/lifecycle/f$a;

    const/4 v7, 0x6

    const-string v8, "ON_ANY"

    invoke-direct {v0, v8, v7}, Landroidx/lifecycle/f$a;-><init>(Ljava/lang/String;I)V

    sput-object v0, Landroidx/lifecycle/f$a;->ON_ANY:Landroidx/lifecycle/f$a;

    const/4 v0, 0x7

    new-array v0, v0, [Landroidx/lifecycle/f$a;

    sget-object v8, Landroidx/lifecycle/f$a;->ON_CREATE:Landroidx/lifecycle/f$a;

    aput-object v8, v0, v1

    sget-object v1, Landroidx/lifecycle/f$a;->ON_START:Landroidx/lifecycle/f$a;

    aput-object v1, v0, v2

    sget-object v1, Landroidx/lifecycle/f$a;->ON_RESUME:Landroidx/lifecycle/f$a;

    aput-object v1, v0, v3

    sget-object v1, Landroidx/lifecycle/f$a;->ON_PAUSE:Landroidx/lifecycle/f$a;

    aput-object v1, v0, v4

    sget-object v1, Landroidx/lifecycle/f$a;->ON_STOP:Landroidx/lifecycle/f$a;

    aput-object v1, v0, v5

    sget-object v1, Landroidx/lifecycle/f$a;->ON_DESTROY:Landroidx/lifecycle/f$a;

    aput-object v1, v0, v6

    sget-object v1, Landroidx/lifecycle/f$a;->ON_ANY:Landroidx/lifecycle/f$a;

    aput-object v1, v0, v7

    sput-object v0, Landroidx/lifecycle/f$a;->$VALUES:[Landroidx/lifecycle/f$a;

    return-void
.end method

.method private constructor <init>(Ljava/lang/String;I)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()V"
        }
    .end annotation

    invoke-direct {p0, p1, p2}, Ljava/lang/Enum;-><init>(Ljava/lang/String;I)V

    return-void
.end method

.method public static valueOf(Ljava/lang/String;)Landroidx/lifecycle/f$a;
    .locals 1

    const-class v0, Landroidx/lifecycle/f$a;

    invoke-static {v0, p0}, Ljava/lang/Enum;->valueOf(Ljava/lang/Class;Ljava/lang/String;)Ljava/lang/Enum;

    move-result-object p0

    check-cast p0, Landroidx/lifecycle/f$a;

    return-object p0
.end method

.method public static values()[Landroidx/lifecycle/f$a;
    .locals 1

    sget-object v0, Landroidx/lifecycle/f$a;->$VALUES:[Landroidx/lifecycle/f$a;

    invoke-virtual {v0}, [Landroidx/lifecycle/f$a;->clone()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, [Landroidx/lifecycle/f$a;

    return-object v0
.end method
